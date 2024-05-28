document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        if (!validateForm()) {
            event.preventDefault();
        }
    });
    const validateForm = () => validateUserField('nombre', 'El nombre es obligatorio') 
    && validateUserField('apellido', 'El apellido es obligatorio') 
    && validateDateField('fechaNacimiento', 'La fecha de nacimiento es obligatoria') 
    && validateEmailField('email', 'El email es obligatorio') 
    && validateUserField('usuario', 'El usuario es obligatorio') 
    && validatePasswordField('password', 'La contraseña es obligatoria');

    const validateUserField = (fieldId, errorMessage) => {
        const field = document.getElementById(fieldId); 
        const value = field.value.trim();
        const regex = /^[a-zA-Z]+$/;
        if (value === '') {
            setErrorFor(field, errorMessage);
            return false;
        }else if (!regex.test(value)) {
            setErrorFor(field, 'Solo se puede introducir letras');
            return false; 
        } else if (value.length < 3 || value.length > 10) {
            setErrorFor(field, 'El campo debe tener entre 3 y 10 caracteres');
            return false;
        } else {
           setSuccessFor(field);
           return true;
        }
    };
    
    const validateDateField = (fieldId, errorMessage) => {
        const field = document.getElementById(fieldId);
        const value = field.value.trim(); 
        const today = new Date();
        const birthDate = new Date(value);
        const minDate = new Date();
        minDate.setFullYear(today.getFullYear() - 100);
        if (value === '') {
            setErrorFor(field, errorMessage); 
            return false;
        }else if (birthDate > today) {
            setErrorFor(field, 'La fecha de nacimiento no puede ser mayor a la fecha actual');
            return false;
        } else if (birthDate < minDate) {
            setErrorFor(field, 'Ingrese una fecha de nacimiento valida');
            return false;             
        } else {
           setSuccessFor(field); 
           return true;
        }
    };

    const validateEmailField = (fieldId, errorMessage) => {
        const field = document.getElementById(fieldId);
        const value = field.value.trim(); 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value === '') {
            setErrorFor(field, errorMessage); 
            return false;
        } else if (!emailRegex.test(value)) {
            setErrorFor(field, 'Ingrese una dirección de correo electrónico válida');
            return false;
        } else {
           setSuccessFor(field); 
           return true;
        }
    };

    const validatePasswordField = (fieldId, errorMessage) => {
        const field = document.getElementById(fieldId);
        const value = field.value.trim(); 
        if (value === '') {
            setErrorFor(field, errorMessage); 
            return false;
        } else if (value.length < 3 || value.length > 15) {
            setErrorFor(field, 'La contraseña debe tener entre 3 y 10 caracteres');
            return false;
        } else {
           setSuccessFor(field); 
           return true;
        }
    };
    const setErrorFor = (input, message) => {
        const formControl = input.parentElement;
        const errorText = formControl.querySelector('.invalid-feedback');
        input.classList.add('is-invalid');
        errorText.innerText = message;
        input.focus();
    };
    const setSuccessFor = (input) => {
        input.classList.remove('is-invalid');
        const formControl = input.parentElement;
        const errorText = formControl.querySelector('.invalid-feedback');
        errorText.innerText = '';
    };
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            const value = input.value.trim();
            if (value !== '') {
                setSuccessFor(input);
            }
        });
    });    
});