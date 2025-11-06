use crate::storage::types::error::Error;
use num_traits::{CheckedAdd, CheckedDiv, CheckedMul, CheckedSub};

pub fn sum<T>(number: &T, addend: &T) -> Result<T, Error>
where
    T: Copy + CheckedAdd,
{
    number.checked_add(addend).ok_or(Error::MathOverflow)
}

pub fn subtract<T>(number: &T, subtrahend: &T) -> Result<T, Error>
where
    T: Copy + CheckedSub,
{
    number.checked_sub(subtrahend).ok_or(Error::MathUnderflow)
}

pub fn multiply<T>(number: &T, multiplier: &T) -> Result<T, Error>
where
    T: Copy + CheckedMul,
{
    number.checked_mul(multiplier).ok_or(Error::MathOverflow)
}

pub fn divide<T>(number: &T, dividend: &T) -> Result<T, Error>
where
    T: Copy + CheckedDiv,
{
    number.checked_div(dividend).ok_or(Error::MathUnderflow)
}
