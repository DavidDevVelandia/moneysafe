let component = {
    name: "",
    image: "",
    id: 0
}

export function changeName(prop) {
    
    if (typeof prop !== 'object' || prop === null) {
        throw new Error('El argumento prop debe ser un objeto.');
    }

    const hasValidName = Object.prototype.hasOwnProperty.call(prop, 'name') && typeof prop.name === 'string';
    const hasValidImage = Object.prototype.hasOwnProperty.call(prop, 'image') && typeof prop.image === 'string';
    const hasValidId = Object.prototype.hasOwnProperty.call(prop, 'id') && typeof prop.id === 'number';

    // Validar todas las propiedades
    if (hasValidName && hasValidImage && hasValidId) {
        component.name = prop.name;
        component.image = prop.image;
        component.id = prop.id;
    } else {
        console.log('El objeto prop no tiene las propiedades necesarias o sus tipos son incorrectos.');
    }
}