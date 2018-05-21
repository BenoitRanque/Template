// This is just an example,
// so you can safely delete all default props below
import validation from './validation'

export default {
  validation,
  'user': 'Usuario',
  'hr': 'RRHH',
  'employees': 'Empleados',
  'config': 'Configuración',
  'config_roles': 'Configuracion de Roles',
  'config_privileges': 'Configuracion de Privilegios',
  'config_users': 'Configuracion de Usuarios',
  'username': 'Nombre de Usuario',
  'password': 'Contraseña',
  'edit': 'Editar',
  'create': 'Crear',
  'update': 'Actualizar',
  'delete': 'Eliminar',
  'saveNew': 'Guardar Nuevo',
  'saveChanges': 'Guardar Cambios',
  'operation': {
    'create': {
      'success': 'Item creado exitosamente',
      'failure': 'Error al crear el item'
    },
    'update': {
      'success': 'Item modificado exitosamente',
      'failure': 'Error al modificar el item'
    },
    'delete': {
      'success': 'Item eliminado exitosamente',
      'failure': 'Error al eliminar el item'
    }
  },
  'buttons': {
    'createItem': 'Crear Item',
    'updateItem': 'Modificar Item',
    'deleteItem': 'Elimninar Item'
  },
  'confirm': {
    'cancelEdit': {
      'title': 'Cancelar?',
      'message': 'Cualquier cambio no guardado sera perdido'
    },
    'createItem': {
      'title': 'Crear Item?',
      'message': 'Se creara un nuevo item en base de datos'
    },
    'updateItem': {
      'title': 'Modificar Item?',
      'message': 'Se modificara el item en base de datos'

    },
    'deleteItem': {
      'title': 'Eliminar Item?',
      'message': 'Se eliminara el item en base de datos'
    }
  }
}
