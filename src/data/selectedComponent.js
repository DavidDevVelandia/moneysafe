let component = {
    name: "",
    id: 0
}

export function changeName(prop) {
    
    if (typeof prop !== 'object' || prop === null) {
        throw new Error('El argumento prop debe ser un objeto.');
    }

    const hasValidName = Object.prototype.hasOwnProperty.call(prop, 'name');
    const hasValidId = Object.prototype.hasOwnProperty.call(prop, 'id');

    // Validar todas las propiedades
    if (hasValidName && hasValidId) {
        component.name = prop.name;
        component.id = prop.id;

        console.log(component.id+" "+component.name)
    } else {
        console.log('El objeto prop no tiene las propiedades necesarias o sus tipos son incorrectos.');
    }
}
export function showName(){
    return {
        name: component.name,
        image: component.image,
        id: component.id
    }
}