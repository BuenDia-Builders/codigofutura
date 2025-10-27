// ⭐ RETO 1: ESTADISTICAS POR USUARIO
// ⭐⭐ RETO 2: TRANSFER_ADMIN
//⭐⭐⭐ RETO 3: LÍMITE DE LONGITUDCONFIGURABLE

#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracterror, contracttype,
    Env, Symbol, Address, String,
};

// -- Errores del contrato --//

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
#[repr(u32)]
pub enum Error {
    NombreVacio = 1, // nombre invalido o vacio
    NombreMuyLargo = 2, // nombre demasiado largo
    NoAutorizado = 3, // llamada no autorizada
    NoInicializado = 4, // contrato no inicializado
}

// -- DataKey--//

#[contracttype]
#[derive(Clone)]
pub enum DataKey { //Configuracion,claves de almacenamiento. 
    Admin,  //Address del admin
    ContadorSaludos,  //u32
    UltimoSaludo(Address),  //u32 (1..=32)
    ContadorPorUsuario(Address),  // u32. ⭐
    LimiteCaracteres, // u32.⭐⭐⭐
}

// -- Contrato SaludoRegistry --//

#[contract]
pub struct SaludoRegistry;

#[contractimpl]
impl SaludoRegistry {
    // Inicializa el contrato con el admin. Solo se ejecuta una vez.
    pub fn initialize(env: Env, admin: Address) -> Result<(), Error> {
        if env.storage().instance().has(&DataKey::Admin) {
            return Err(Error::NoInicializado);
        }
        // Guardar Admin . instance storage (IS)
        env.storage().instance().set(&DataKey::Admin, &admin);
        //Inicializar contador global
        env.storage().instance().set(&DataKey::ContadorSaludos, &0u32);
        // Extender TTl del IS
        env.storage().instance().extend_ttl(100, 100);

        env.storage()
            .instance()
            .set(&DataKey::LimiteCaracteres, &32u32); //⭐⭐⭐ valor por defecto 32
        Ok(())
    }

    //--- Hello ---//
    pub fn hello(env: Env, usuario: Address, nombre: String) -> Result<Symbol, Error> {
        //1. Validación. Nombre no vacio
        if nombre.len() == 0 {
            return Err(Error::NombreVacio);
        }
        //2. Validación. longitud caracteres <=32
        //if nombre.len() > 32 {
        //    return Err(Error::NombreMuyLargo);
        //}
        // leer contador global
        let key_contador = DataKey::ContadorSaludos;
        let contador: u32 = env.storage().instance().get(&key_contador).unwrap_or(0);

        //Incremetar y guardar
        env.storage()
            .instance()
            .set(&key_contador, &(contador + 1));

        // Incrementar contador del usuario ⭐
        let key_usuario = DataKey::ContadorPorUsuario(usuario.clone());
        let contador_usuario: u32 = env.storage()
            .persistent()
            .get(&key_usuario)
            .unwrap_or(0);
        
        env.storage()
            .persistent()
            .set(&key_usuario, &(contador_usuario + 1));
        
        //⭐⭐⭐ Validación longitud según límite configurable
        let lim: u32 = env.storage()
            .instance()
            .get(&DataKey::LimiteCaracteres)
            .unwrap_or(32);
        
        if nombre.len() > lim {
            return Err(Error::NombreMuyLargo);
        }

        //Guardar ultimo saludo del usuario
        env.storage()
            .persistent()
            .set(&DataKey::UltimoSaludo(usuario.clone()), &nombre);

        //Extender TTL del IS
        env.storage()
            .persistent()
            .extend_ttl(&DataKey::UltimoSaludo(usuario), 100, 100);
        env.storage().instance().extend_ttl(100, 100);

        // Retornar saludo
        Ok(Symbol::new(&env, "Hola"))
    }

    //--- funciones de consulta --//
    pub fn get_contador(env: Env) -> u32 {
        env.storage()
            .instance()
            .get(&DataKey::ContadorSaludos)
            .unwrap_or(0)
    }

    // Obtener ultimo saludo de un usuario
    pub fn get_ultimo_saludo(env: Env, usuario: Address) -> Option<String> {
        env.storage()
            .persistent()
            .get(&DataKey::UltimoSaludo(usuario))
    }

    //--- funciones de administración --//
    pub fn reset_contador(env: Env, caller: Address) -> Result<(), Error> {
        // Verificar si el caller es admin
        let admin: Address = env
            .storage()
            .instance()
            .get(&DataKey::Admin)
            .ok_or(Error::NoInicializado)?;

        if caller != admin {
            return Err(Error::NoAutorizado);  // solo admin puede resetear
        }

        // Resetear contador a 0
        env.storage().instance().set(&DataKey::ContadorSaludos, &0u32);
        Ok(())
    }

    pub fn get_contador_usuario(env: Env, usuario: Address) -> u32 {
        env.storage()
            .persistent()
            .get(&DataKey::ContadorPorUsuario(usuario))
            .unwrap_or(0)
    }

    // --- Transferir admin ⭐⭐---//
    pub fn transfer_admin(
        env: Env,
        caller: Address,
        new_admin: Address
    ) -> Result<(), Error> {
        // I. Verificar que caller sea el adm actual
        let admin: Address = env.storage().instance().get(&DataKey::Admin).ok_or(Error::NoInicializado)?;
        
        if caller != admin {
            return Err(Error::NoAutorizado);
        }

        // II. Cambiar el admin
        env.storage().instance().set(&DataKey::Admin, &new_admin);

        // III. Extender TTL
        env.storage().instance().extend_ttl(100, 100);
        
        Ok(())
    }

    // --- Establecer límite (lim) de caracteres ⭐⭐⭐---//
    pub fn set_limite(
        env: Env,
        caller: Address,
        lim: u32
    ) -> Result<(), Error> {
        // Verificar admin
        let admin: Address = env.storage()
            .instance()
            .get(&DataKey::Admin)
            .ok_or(Error::NoInicializado)?;
        
        if caller != admin {
            return Err(Error::NoAutorizado);
        }
        
        // Guardar nuevo límite
        env.storage()
            .instance()
            .set(&DataKey::LimiteCaracteres, &lim);
        
        Ok(())
    }
}

// --- Tests (integrado) ---//
#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::{Env, testutils::Address as _};

    #[test]
    fn test_initialize() {
        let env = Env::default();
        let contract_id = env.register_contract(None, SaludoRegistry);
        let client = SaludoRegistryClient::new(&env, &contract_id);

        let admin = Address::generate(&env);
        
        // Primera inicialización debe funcionar
        client.initialize(&admin);
        
        // Verificar contador en 0
        assert_eq!(client.get_contador(), 0);
    }

        #[test]
    #[should_panic(expected = "Error(Contract, #4)")]
    fn test_no_reinicializar() {
        let env = Env::default();
        let contract_id = env.register_contract(None, SaludoRegistry);
        let client = SaludoRegistryClient::new(&env, &contract_id);

        let admin = Address::generate(&env);
        
        client.initialize(&admin);
        client.initialize(&admin);  // Segunda vez debe fallar
    }


        #[test]
    fn test_hello_exitoso() {
        let env = Env::default();
        let contract_id = env.register_contract(None, SaludoRegistry);
        let client = SaludoRegistryClient::new(&env, &contract_id);

        let admin = Address::generate(&env);
        let usuario = Address::generate(&env);
        
        client.initialize(&admin);

        // Usar String::from_str en lugar de Symbol::new
        let nombre = String::from_str(&env, "Ana");
        let resultado = client.hello(&usuario, &nombre);
        
        assert_eq!(resultado, Symbol::new(&env, "Hola"));
        assert_eq!(client.get_contador(), 1);
        assert_eq!(client.get_ultimo_saludo(&usuario), Some(nombre));
    }

        #[test]
    #[should_panic(expected = "Error(Contract, #1)")]
    fn test_nombre_vacio() {
        let env = Env::default();
        let contract_id = env.register_contract(None, SaludoRegistry);
        let client = SaludoRegistryClient::new(&env, &contract_id);

        let admin = Address::generate(&env);
        let usuario = Address::generate(&env);
        
        client.initialize(&admin);
        
        // Usar String::from_str para string vacío
        let vacio = String::from_str(&env, "");
        client.hello(&usuario, &vacio);  // Debe fallar
    }

        #[test]
    fn test_reset_solo_admin() {
        let env = Env::default();
        let contract_id = env.register_contract(None, SaludoRegistry);
        let client = SaludoRegistryClient::new(&env, &contract_id);
        
        let admin = Address::generate(&env);
        let usuario = Address::generate(&env);
        
        client.initialize(&admin);
        
        // Hacer saludos con String
        client.hello(&usuario, &String::from_str(&env, "Test"));
        assert_eq!(client.get_contador(), 1);
        
        // Admin puede resetear
        client.reset_contador(&admin);
        assert_eq!(client.get_contador(), 0);
    }

        #[test]
    #[should_panic(expected = "Error(Contract, #3)")]
    fn test_reset_no_autorizado() {
        let env = Env::default();
        let contract_id = env.register_contract(None, SaludoRegistry);
        let client = SaludoRegistryClient::new(&env, &contract_id);

        let admin = Address::generate(&env);
        let otro = Address::generate(&env);
        
        client.initialize(&admin);
        
        // Otro usuario intenta resetear
        client.reset_contador(&otro);  // Debe fallar
    }

        #[test] //⭐
    fn test_contador_por_usuario() {
        let env = Env::default();
        let contract_id = env.register_contract(None, SaludoRegistry);
        let client = SaludoRegistryClient::new(&env, &contract_id);
        
        let admin = Address::generate(&env);
        let usuario = Address::generate(&env);
        
        client.initialize(&admin);
        
        // Usuario saluda 3 veces
        client.hello(&usuario, &String::from_str(&env, "Beth"));
        client.hello(&usuario, &String::from_str(&env, "Alisson"));
        client.hello(&usuario, &String::from_str(&env, "Barb"));
        
        assert_eq!(client.get_contador_usuario(&usuario), 3);
        assert_eq!(client.get_contador(), 3);
    }

     #[test] //⭐⭐
    fn test_transfer_admin() {
        let env = Env::default();
        let contract_id = env.register_contract(None, SaludoRegistry);
        let client = SaludoRegistryClient::new(&env, &contract_id);
        
        let admin = Address::generate(&env);
        let new_admin = Address::generate(&env);
        let usuario = Address::generate(&env);
        
        client.initialize(&admin);
        
        // Adm transfiere ownership
        client.transfer_admin(&admin, &new_admin);

        // Hacer un saludo
        client.hello(&usuario, &String::from_str(&env, "Test"));

        // Nuevo admin puede resetear
        client.reset_contador(&new_admin);
        assert_eq!(client.get_contador(), 0);
    }

    #[test] //⭐⭐
    #[should_panic(expected = "Error(Contract, #3)")]
    fn test_transfer_admin_no_autorizado() {
        let env = Env::default();
        let contract_id = env.register_contract(None, SaludoRegistry);
        let client = SaludoRegistryClient::new(&env, &contract_id);
        
        let admin = Address::generate(&env);
        let intruso = Address::generate(&env);
        let new = Address::generate(&env);
        
        client.initialize(&admin);

        // Intruso intenta transferir
        client.transfer_admin(&intruso, &new);  // Debe fallar
    }

     #[test] //⭐⭐⭐
    fn test_lim_configurable() {
        let env = Env::default();
        let contract_id = env.register_contract(None, SaludoRegistry);
        let client = SaludoRegistryClient::new(&env, &contract_id);
        
        let admin = Address::generate(&env);
        let usuario = Address::generate(&env);
        
        client.initialize(&admin);

        // Admin cambia límite a 20
        client.set_limite(&admin, &20);

        // Nombre de 21 caracteres debe fallar
        let nombre_largo = String::from_str(&env, "123456789012345678901");
        
        // Este debería fallar
        let resultado = client.try_hello(&usuario, &nombre_largo);
        assert!(resultado.is_err());
    }
}