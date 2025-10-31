import { Button, Card, FormControl, FormLabel, Input, Stack, Text } from '@chakra-ui/react'
import { type FC, useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import 'twin.macro'
import { useSorobanReact } from "@soroban-react/core"
import * as StellarSdk from '@stellar/stellar-sdk'
import React from 'react'
import { useRegisteredContract } from '@soroban-react/contracts'
import { nativeToScVal, scValToNative } from '@stellar/stellar-sdk'

type TransferTokensValues = { to: string; amount: string }

export const GreeterContractInteractions: FC = () => {
    const sorobanContext = useSorobanReact()
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, reset } = useForm<TransferTokensValues>()
    const [balance, setBalance] = useState<string>('0')

    const contract = useRegisteredContract("CBSJOYCR2JE3MPMSZ7YOUPEYS4LRRMPFU2KTNGJ6TJFZAH52VCQFCYHK")
    const { address, server, activeChain, connect, connectors } = sorobanContext

    const fetchBalance = useCallback(async () => {
        if (!contract || !address) return

        try {
            const result = await contract.invoke({
                method: 'balance',
                args: [nativeToScVal(address, { type: 'address' })],
            })

            const balanceValue = scValToNative(result as StellarSdk.xdr.ScVal)
            setBalance(balanceValue.toString())
        } catch (e) {
            console.error('Error fetching balance:', e)
            toast.error('Error al obtener balance')
        }
    }, [contract, address])

    useEffect(() => {
        fetchBalance()
    }, [fetchBalance])

    const transferTokens = async (data: TransferTokensValues) => {
        if (!contract || !address || !server || !activeChain) {
            toast.error('Wallet no conectada o red no disponible')
            return
        }

        if (!data.to || data.to.length !== 56 || !data.to.startsWith('G')) {
            toast.error('Direccion invalida. Debe comenzar con G y tener 56 caracteres')
            return
        }

        if (!data.amount || parseFloat(data.amount) <= 0) {
            toast.error('El monto debe ser mayor a 0')
            return
        }

        setLoading(true)
        try {
            if (!sorobanContext.activeConnector) {
                throw new Error('No hay wallet conectada')
            }

            if (!activeChain?.networkPassphrase) {
                throw new Error('Network no configurado')
            }
            const sourceAccount = await server.getAccount(address)

            const contractAddress = contract.deploymentInfo.contractAddress
            console.log('Contract Address:', contractAddress)

            const operation = StellarSdk.Operation.invokeContractFunction({
                contract: contractAddress,
                function: 'transfer',
                args: [
                    nativeToScVal(address, { type: 'address' }),
                    nativeToScVal(data.to, { type: 'address' }),
                    nativeToScVal(BigInt(data.amount), { type: 'i128' })
                ]
            })

            const fee = (parseInt(StellarSdk.BASE_FEE) * 100000).toString()
            let transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
                fee: fee,
                networkPassphrase: activeChain.networkPassphrase,
            })
                .addOperation(operation)
                .setTimeout(30)
                .build()

            const simulatedTx = await server.simulateTransaction(transaction)
            if (StellarSdk.SorobanRpc.Api.isSimulationSuccess(simulatedTx)) {
                transaction = StellarSdk.SorobanRpc.assembleTransaction(
                    transaction,
                    simulatedTx
                ).build()
            } else {
                throw new Error('error: ' + JSON.stringify(simulatedTx))
            }

            const xdr = transaction.toXDR()
            const signedTxXdr = await sorobanContext.activeConnector.signTransaction(
                xdr,
                {
                    networkPassphrase: activeChain.networkPassphrase,
                    accountToSign: address
                }
            )

            if (!signedTxXdr) {
                throw new Error('No se pudo firmar la transacción')
            }

            const signedTransaction = StellarSdk.TransactionBuilder.fromXDR(
                signedTxXdr,
                activeChain.networkPassphrase
            ) as StellarSdk.Transaction

            const sendResponse = await server.sendTransaction(signedTransaction)

            if (sendResponse.status === 'ERROR') {
                throw new Error('Error al enviar transacción: ' + JSON.stringify(sendResponse))
            }

            let attempts = 0
            const maxAttempts = 60
            let getResponse

            while (attempts < maxAttempts) {
                try {
                    getResponse = await server.getTransaction(sendResponse.hash)
                    if (attempts % 5 === 0 || getResponse.status !== 'NOT_FOUND') {
                        console.log(`⏳ Intento ${attempts + 1}/${maxAttempts} - Status:`, getResponse.status)
                    }

                    if (getResponse.status === 'SUCCESS') {
                        toast.success('transferencia realizada con exito')
                        reset()
                        setTimeout(() => fetchBalance(), 2000)
                        return
                    } else if (getResponse.status === 'FAILED') {
                        throw new Error('transacción rechazada por la red')
                    }
                } catch (error: any) {
                    if (attempts % 10 === 0) {
                        console.log(`aun procesando...  ${attempts + 1}/${maxAttempts}`)
                    }
                }

                attempts++
                await new Promise(resolve => setTimeout(resolve, 1000))
            }

            toast.success('transaccion enviada. verificando...')

            setTimeout(() => {
                fetchBalance()
                toast.success('Balance actualizado. Verifica en Stellar Expert si tienes dudas.')
            }, 3000)

        } catch (e: any) {
            const errorMessage = e?.message || e?.toString() || 'Transacción fallida'
            toast.error(`Error: ${errorMessage}`)
        } finally {
            setLoading(false)
        }
    }

    if (!contract) {
        return (
            <div tw="flex grow flex-col space-y-4 max-w-[20rem]">
                <h2 tw="text-center font-mono text-gray-400">Smart Contract</h2>
                <Card variant="outline" p={4} bgColor="whiteAlpha.100">
                    <p tw="text-center font-mono text-sm">No deployment found in the current chain</p>
                    <p tw="text-center font-mono text-lg mt-4">Available deployments:</p>
                    {sorobanContext?.deployments?.map((d, i) => (
                        <p key={i} tw="text-center font-mono text-sm">- {d.networkPassphrase}</p>
                    ))}
                </Card>
            </div>
        )
    }

    return (
        <div tw="flex flex-col space-y-4 max-w-[20rem]">
            <h2 tw="text-center font-mono text-gray-400">Token Ayllu Smart Contract</h2>

            <Card p={4} bgColor="purple.900">
                <FormControl>
                    <FormLabel color="white">Tu Balance Actual</FormLabel>
                    <Text fontSize="2xl" fontWeight="bold" color="white">
                        {balance} AYL
                    </Text>
                </FormControl>
            </Card>

            <Card p={4}>
                <form onSubmit={handleSubmit(transferTokens)}>
                    <Stack direction="column" spacing={3}>
                        <FormControl isRequired>
                            <FormLabel>Dirección Destino</FormLabel>
                            <Input
                                {...register('to')}
                                placeholder="GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                                size="sm"
                            />
                            <Text fontSize="xs" color="gray.500" mt={1}>
                                Debe comenzar con G y tener 56 caracteres
                            </Text>
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Cantidad de Tokens</FormLabel>
                            <Input
                                type="number"
                                {...register('amount')}
                                placeholder="100"
                                min="1"
                            />
                        </FormControl>

                        <Button
                            type="submit"
                            colorScheme="purple"
                            isLoading={loading}
                            loadingText="Enviando..."
                            isDisabled={!address}
                        >
                            Enviar Tokens
                        </Button>
                    </Stack>
                </form>
            </Card>

            <Card p={3} bgColor="gray.800">
                <Text fontSize="xs" color="gray.400" textAlign="center">
                    {address ? `Conectado: ${address.slice(0, 8)}...${address.slice(-8)}` : 'Conecta tu wallet para usar el token'}
                </Text>
                {sorobanContext.activeConnector && (
                    <Text fontSize="xs" color="gray.500" textAlign="center" mt={1}>
                        Wallet: {sorobanContext.activeConnector.name}
                    </Text>
                )}
            </Card>
        </div>
    )
}