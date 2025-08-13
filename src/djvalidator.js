import { isReactive,isRef,toRaw } from 'vue'
import validators from './validators'
import messages from './messages'
import {required} from './functions'
function validate(model, validations, errors) {
    if(model&&isReactive(model))model=toRaw(model);
    if (model !== null && typeof model !== 'object' && !Array.isArray(model)) {
        throw new Error("Model is not object")
    }
    
    clean_errors(errors)

    //validar todo el model:
    let valid = true
    for (const [input, value] of Object.entries(model)) {
        let validation=validations[input]
        if (validation==undefined) continue
        if (!Array.isArray(validation))validation=[validation]
        for(const v of validation){
            let resp = validate_field(input,model, v , errors)
            valid = (resp == true ? valid : (resp == false ? false : valid))
            if(resp==false)break
        }
    }
    return valid
}

function validate_var(value,validation,error) {
    if(isRef(error))error.value=null
    else error=null
    let temp_obj={'tmp':value}
    let errors=[]
    let result=validate_field('tmp',temp_obj,validation,errors)
    if(result==false)isRef(error)?error.value=errors['tmp']:error=errors['tmp']
    return result
}

function validate_field(input,model,validation,errors) {
    if(model&&isReactive(model))model=toRaw(model)
    delete errors[input]
    //obtener si el campo tiene un valor
    let resp=required(input,model[input],errors)
    
    //si hay regla proceder validación
    if(validation.rule){
        //buscar validador correspondiente
        let params=validation.rule.split(",")
        let validator=validators.find(v=>v.key==params[0]);
        if(!validator)throw new Error("'"+params[0]+"' is not a valid DjValidator rule.")
        
        //si el campo esta relacionado a otro (ref), ignorar el valor de required
        if(validator.ref&&validator.ref==true)delete errors[input]

        //si no esta relacionado verificar la validación required si esta vacio
        else if(resp==false){
            //si el campo es requerido return false
            if(validation.req&&validation.req==true){
                return false
            }
            //si no es requerido return true
            delete errors[input]
            return true
        }

        //si esta llenado ejecutar la función de validación
        if(validator.key=='call')return validator['func'](input,model,params,errors,validation.msg,validation.func)
        else return validator['func'](input,model,params,errors,validation.msg,)
    }
    
    //si no hay regla, y esta vacio
    else if(resp==false){
        //si el campo es requerido return false
        if(validation.req&&validation.req==true){
            return false
        }
        //si no es requerido return true
        delete errors[input]
        return true
    }

    //si no hay regla y esta llenado directamente es true
    return true
}

function clean_errors(errors){
    for (const key in errors) delete errors[key]
}

function add_validator(key,func,message){
    validators.push({'key':key,'func':(name,model,params,errors,msg)=>{
        if(func(name,model,params)==false){
            errors[name]=msg||message
            for(let i=1;i<params.length;i++){
                errors[name]=errors[name].replace("$"+i,params[i])
            }
            return false
        } 
    }})
}

function set_messages(new_messages){
    Object.assign(messages, new_messages)
}

export { validate, validate_field, validate_var, clean_errors, add_validator, set_messages }
