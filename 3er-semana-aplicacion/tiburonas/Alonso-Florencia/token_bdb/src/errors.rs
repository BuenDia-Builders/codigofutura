// src/errors.rs

use soroban_sdk::contracterror;

/// Enum de errores personalizados para el token
/// 
/// Cada error tiene un código único para debugging en el ledger
/// Los códigos empiezan en 1 (0 está reservado para "sin error")
#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum TokenError {
    /// El contrato ya fue inicializado
    /// Se lanza si se intenta llamar initialize() dos veces
    AlreadyInitialized = 1,
    
    /// Amount debe ser mayor a 0
    /// Transferencias, mint, burn, etc. no aceptan 0
    InvalidAmount = 2,
    
    /// Balance insuficiente para la operación
    /// El usuario no tiene suficientes tokens
    InsufficientBalance = 3,
    
    /// Allowance insuficiente para transfer_from
    /// El spender no tiene permiso suficiente
    InsufficientAllowance = 4,
    
    /// El contrato no ha sido inicializado
    /// Todas las operaciones requieren initialize() primero
    NotInitialized = 5,
    
    /// Decimales inválidos (máximo 18)
    /// Por convención, Stellar usa 7, Ethereum 18
    InvalidDecimals = 6,
    
    /// Overflow en operación aritmética
    /// checked_add/checked_sub detectó overflow
    OverflowError = 7,
    
    /// Transferencia a sí mismo no permitida
    /// from == to (optimización de gas)
    InvalidRecipient = 8,
    
    /// Nombre o símbolo inválido (vacío o muy largo)
    /// Validación de metadatos en initialize()
    InvalidMetadata = 9,
}
