document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        if (!validateForm()) {
            event.preventDefault();
        }
    });
    const validateForm = () => validateUserField('nombre', 'El usuario es obligatorio') 
    && validateUserField('apellido', 'El usuario es obligatorio') 
    && validateDateField('fechaNacimiento', 'La fecha de nacimiento es obligatoria') 
    && validateDNIField('dni', 'El DNI es obligatorio') 
    && validateAdressField('direccion', 'La direccion es obligatoria') 
    && validatePhoneField('telefono', 'El telefono es obligatorio') 
    && validateEmailField('email', 'El email es obligatorio') 
    && validateUserField('nombreMichi', 'El nombre del michi es obligatorio') 

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

    const validateDNIField = (fieldId, errorMessage) => {
        const field = document.getElementById(fieldId);
        const value = field.value.trim(); 
        const dniRegex = /^\d{7,8}$/;
        const numericRegex = /^[0-9]+$/;
        if (value === '') {
            setErrorFor(field, errorMessage); 
            return false;
        } else if (!dniRegex.test(value)) {
            setErrorFor(field, 'Ingrese un número de DNI válido');
            return false;
        } else if (!numericRegex.test(value)) {
            setErrorFor(field, 'Ingrese un número de DNI válido');
            return false;
        } else if (parseInt(value, 10) <= 0) {
            setErrorFor(field, 'Ingrese un número de DNI válido');
            return false;
        } else {
           setSuccessFor(field); 
           return true;
        }
    };

    const validateAdressField = (fieldId, errorMessage) => {
        const field = document.getElementById(fieldId);
        const value = field.value.trim(); 
        if (value === '') {
            setErrorFor(field, errorMessage); 
            return false;
        } else if (!/[a-zA-Z]/.test(value)) {
            setErrorFor(field, 'El campo debe contener al menos una letra');
            return false;
        } else if (value.length < 3 || value.length > 100) {
            setErrorFor(field, 'El campo debe tener entre 3 y 100 caracteres');
            return false;
        } else {
           setSuccessFor(field); 
           return true;
        }
    };
    const validatePhoneField = (fieldId, errorMessage) => {
        const field = document.getElementById(fieldId);
        const value = field.value.trim(); 
        const numericRegex = /^[0-9]+$/;
        const phoneRegex = /^\d{5,20}$/;
        if (value === '') {
            setErrorFor(field, errorMessage); 
            return false;
        } else if (!numericRegex.test(value)) {
            setErrorFor(field, 'Ingrese un telefono válido');
            return false;
        } else if (!phoneRegex.test(value)) {
            setErrorFor(field, 'Ingrese un número de teléfono válido');
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