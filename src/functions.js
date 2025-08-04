import messages from './messages'
function required(name,value,errors) {
    if(Array.isArray(value)&&value.length==0){
        errors[name]=messages.required
        return false
    }
    if(value==null||value==""||/^\s+$/.test(value)){
        errors[name]=messages.required
        return false
    }
    return true
}

function word(name,model,params,errors,msg) {
    if (params.length<3) throw new Error("Error validating field '"+name+"', insufficient parameters.");
    let value=model[name]
    if (params[2]=="*") {
        if (!new RegExp("^\\S{" + params[1] + ",}$").test(value)) { 
            if(!msg)msg=messages.word_min
            errors[name]=msg.replace('$1', params[1])
            return false
        }
    }
    else if (!new RegExp("^\\S{" + params[1] + "," + params[2] + "}$").test(value)) {
        if(!msg)msg=messages.word_between
        errors[name]=msg.replace('$1', params[1]).replace('$2', params[2])
        return false; 
        }
    return true;

}

function atext(name,model,params,errors,msg) {
    if (params.length<3) throw new Error("Error validating field '"+name+"', insufficient parameters.")
    let value=model[name]
    if (params[2] == "*") {
        if (!new RegExp("^[a-záéíóúñçü ]{" + params[1] + ",}$", "i").test(value)) {
            if(!msg)msg=messages.atext_min
            errors[name]=msg.replace('$1', params[1])
            return false
        }
    }
    else if (!new RegExp("^[a-záéíóúñçü ]{" + params[1] + "," + params[2] + "}$", "i").test(value)) {
            if(!msg)msg=messages.atext_between
            errors[name]=msg.replace('$1', params[1]).replace('$2', params[2])
            return false
        }
    return true
}

function antext(name,model,params,errors,msg) {
    if (params.length<3) throw new Error("Error validating field '"+name+"', insufficient parameters.")
    let value=model[name]
    if (params[2] == "*") {
        if (!new RegExp("^[a-z0-9áéíóúñçü ]{" + params[1] + ",}$", "i").test(value)) {
            if(!msg)msg=messages.antext_min
            errors[name]=msg.replace('$1', params[1])
            return false
        }
    }
    else if (!new RegExp("^[a-z0-9áéíóúñçü ]{" + params[1] + "," + params[2] + "}$", "i").test(value)) {
            if(!msg)msg=messages.antext_between
            errors[name]=msg.replace('$1', params[1]).replace('$2', params[2])
            return false
        }
    return true
}

function text(name,model,params,errors,msg) {
    if (params.length<3) throw new Error("Error validating field '"+name+"', insufficient parameters.")
    let value=model[name]
    if (params[2] == "*") {
        if (value.length < params[1]) { 
            if(!msg)msg=messages.text_min
            errors[name]=msg.replace('$1', params[1])
            return false
        }
    }
    else if (value.length < params[1] || value.length > params[2]) { 
            if(!msg)msg=messages.text_between
            errors[name]=msg.replace('$1', params[1]).replace('$2', params[2])
            return false
        }
    return true
}

function integer(name,model,params,errors,msg) {
    if (params.length<3) throw new Error("Error validating field '"+name+"', insufficient parameters.");
    let value=model[name]
    if (!/^[+-]?\d+$/.test(value)) {
        if(!msg)msg=messages.int_invalid
        errors[name]=msg
        return false 
    }
    if (params[1] == "*") {
        if (params[2] == "*") return true
        else if (parseInt(value) > params[2]) { 
            if(!msg)msg=messages.int_max
            errors[name]=msg.replace('$1', params[2])
            return false 
        }
    }
    else if (params[2] == "*") {
        if (parseInt(value) < params[1]) {
            if(!msg)msg=messages.int_min
            errors[name]=msg.replace('$1', params[1])
            return false
        }
    }
    else if (parseInt(value) < params[1] || parseInt(value) > params[2]) {
        if(!msg)msg=messages.int_between
        errors[name]=msg.replace('$1', params[1]).replace('$2', params[2])
        return false
    }
    return true
}

function number(name,model,params,errors,msg) {
    if (params.length<3) throw new Error("Error validating field '"+name+"', insufficient parameters.")
    let value=model[name]
    if (isNaN(value)) {
        if(!msg)msg=messages.num_invalid
        errors[name]=msg
        return false 
    }
    if (params[1] == "*") {
        if (params[2] == "*") return true
        else if (parseFloat(value) > params[2]) {
            if(!msg)msg=messages.num_max
            errors[name]=msg.replace('$1', params[2])
            return false 
        }
    }
    else if (params[2] == "*") {
        if (parseFloat(value) < params[1]) {
            if(!msg)msg=messages.num_min
            errors[name]=msg.replace('$1', params[1])
            return false 
        }
    }
    else if (parseFloat(value) < params[1] || parseFloat(value) > params[2]) {
            if(!msg)msg=messages.num_between
            errors[name]=msg.replace('$1', params[1]).replace('$2', params[2])
            return false 
    }
    return true
}

function digit(name,model,params,errors,msg) {
    if (params.length<3) throw new Error("Error validating field '"+name+"', insufficient parameters.")
    let value=model[name]
    if (params[2] == "*") {
        if (!new RegExp("^\\d{" + params[1] + ",}$").test(value)) {
            if(!msg)msg=messages.dig_min
            errors[name]=msg.replace('$1', params[1])
            return false 
        }
    }
    else if (!new RegExp("^\\d{" + params[1] + "," + params[2] + "}$").test(value)) {
            if(!msg)msg=messages.dig_between
            errors[name]=msg.replace('$1', params[1]).replace('$2', params[2])
            return false 
        }
    return true
}

function file(name,model,params,errors,msg) {
    if (!File) { console.error("The 'file' validator requires javascript file api, the field  '" + name + "' was ignored."); return true }
    if (params.length < 5) throw new Error("Error validating field '" + name + "'" + ", insufficient parameters.")

    let archivos=[]
    if(model[name] instanceof File)archivos[0]=model[name]
    else if(model[name] instanceof FileList)archivos=Array.from(model[name])
    else if(Array.isArray(model[name]))archivos=model[name]
    else throw new Error("Error validating field '" + name + "'" + ", file validator value only supports File,FileList or Array<File>")

    if (params[2] == "*") {
        if (archivos.length < params[1]) { 
            if(!msg)msg=messages.file_min
            errors[name]=msg.replace('$1', params[1])
            return false
        }
    }
    else if (archivos.length < params[1] || archivos.length > params[2]) { 
            if(!msg)msg=messages.file_between
            errors[name]=msg.replace('$1', params[1]).replace('$2', params[2])
            return false
    }
    if (params[5]) {
        let validos = params[5].split('|')
        let ok = validos.length == 0 ? true : false
        for (let i = 0; i < archivos.length; i++) {
            ok = false
            for (let j = 0; j < validos.length; j++) {
                if (archivos[i].type == validos[j]) ok = true
            }
            if (!ok) break
        }
        if (ok==false) { 
            if(!msg)msg=messages.file_format
            errors[name]=msg
            return false
        }
    for (let i = 0; i < archivos.length; i++) {
        if (params[3] != "*" && (archivos[i].size / 1024) < params[3]) { 
            if(!msg)msg=messages.file_min_size
            errors[name]=msg.replace('$1', params[3])
            return false 
        }
        if (params[4] != "*" && (archivos[i].size / 1024) > params[4]) { 
            if(!msg)msg=messages.file_max_size
            errors[name]=msg.replace('$1', params[4])
            return false 
        }
    }
    return true
}
}

function email(name,model,params,errors,msg){
    if (params.length < 2) throw new Error("Error validating field '" +name+ "'" + ", insufficient parameters.")
    let value=model[name]
    if (!/^([a-z0-9_.-])+@(([a-z0-9-])+.)+([a-z0-9])+$/i.test(value)) {
        errors[name]=msg||messages.email
        return false
    }
    if (params[1] != '*' && value.length > params[1]) { 
        if(!msg)msg=messages.email_max
        errors[name]=msg.replace('$1', params[1])
        return false
    }
    return true
}

function phone(name,model,params,errors,msg){
    let value=model[name]
    if (!/^\+?\d[\d\s\-]{6,14}\d$/.test(value)) { 
        errors[name]=msg||messages.phone
        return false
    }
    return true
}

function url(name,model,params,errors,msg){
    if (params.length < 2) throw new Error("Error validating field '" + name + "'" + ", insufficient parameters.")
    let value=model[name]
    if (!/^(https?|s?ftp)\:\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?$/.test(value)) { 
        errors[name]=msg||messages.url
        return false
    }
    if (params[1] != '*' && value.length > params[1]) { 
        if(!msg)msg=messages.url_max
        errors[name]=msg.replace('$1', params[1])
        return false
    }
    return true
}

function ip(name,model,params,errors,msg) {
    let value=model[name]
    let rv6 = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/
    let rv4 = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])$/
    if (!params[1]) {
        if (!rv6.test(value) && !rv4.test(value)) { 
            if(!msg)msg=messages.ip
            errors[name]=msg.replace('$1', 'IP') 
            return false
        } 
    }
    else if (params[1] == 'v6') { 
        if (!rv6.test(value)) {
            if(!msg)msg=messages.ip
            errors[name]=msg.replace('$1','IPv6') 
            return false
        } 
    }
    else if (params[1] == 'v4') {
        if (!rv4.test(value)) { 
            if(!msg)msg=messages.ip
            errors[name]=msg.replace('$1','IPv4') 
            return false
        } 
    }
    else throw new Error("Error validating field '" + name + "'" + ", invalid ip type parameter.")
    return true
}

function array_length(name,model,params,errors,msg) {
    if (params.length < 3) throw new Error("Error validating field '" + name + "'" + ", insufficient parameters.")
    let values = model[name]
    if(!Array.isArray(values))throw new Error("Error validating field '" + name + "'" + ", the value is not Array")
    if (params[2] == "*") {
        if (values.length < parseInt(params[1])) {
            if(!msg)msg=messages.array_min
            errors[name]=msg.replace('$1',params[1])
            return false
        }
    }
    else if (values.length < parseInt(params[1]) || values.length > parseInt(params[2])) {
        if(!msg)msg=messages.array_between
        errors[name]=msg.replace('$1',params[1]).replace('$2',params[2])
        return false
    }
    return true
}

function and(name,model,params,errors,msg) {
    if (params.length < 2) throw new Error("Error validating field '" + name + "'" + ", insufficient parameters.")
    let value = model[name]
    let valid = true

    if(value==null||value==""||/^\s+$/.test(value)){
        valid = false
    }
    else {
        let other=model[params[1]]
        if(other==null||other==""||/^\s+$/.test(other)){
            valid = false
        }
    }
    if(valid==false){
        if(!msg)msg=messages.and
        errors[name]=msg.replace('$1', params[1])
    }
    return valid
}

function or(name,model,params,errors,msg) {
    if (params.length < 2) throw new Error("Error validating field '" + name + "'" + ", insufficient parameters.")
    let value = model[name]

    if(value!=null&&value!=""&&!/^\s+$/.test(value)){
        return true
    }
    else {
        let other=model[params[1]]
        if(other!=null&&other!=""&&!/^\s+$/.test(other)){
            return true
        }
    }
    
    if(!msg)msg=messages.or
    errors[name]=msg.replace('$1', params[1])
    return false
}

function equal(name,model,params,errors,msg) {
    if (params.length < 2) throw new Error("Error validating field '" + name + "'" + ", insufficient parameters.")
    if (model[name]!=model[params[1]]) { 
        if(!msg)msg=messages.equal
        errors[name]=msg.replace('$1',params[1])
        return false
    }
    return true
}

function not_equal(name,model,params,errors,msg) {
    if (params.length < 2) throw new Error("Error validating field '" + name + "'" + ", insufficient parameters.")
    if (model[name]==model[params[1]]) { 
        if(!msg)msg=messages.not_equal
        errors[name]=msg.replace('$1',params[1])
        return false
    }
    return true
}

function regexp(name,model,params,errors,msg) {
    if (params.length < 2) throw new Error("Error validating field '" + name + "'" + ", insufficient parameters.")
    let value=model[name]
    params[1] = params[1].replace('°', ',')
    let ext = params[2] ? new RegExp(params[1], params[2]) : new RegExp(params[1])
    if (!ext.test(value)) { 
        errors[name]=msg||messages.regexp
        return false
    }
    return true
}

function callback(name,model,params,errors,msg,func) {
    if(typeof func !== 'function')throw new Error("Error validating field '"+ name + "', '"+ params[1] + "' is not a function.");
    let result=func(model[name],params)
    if (result == false) {
        errors[name]=msg||messages.call
    }
    return result
}

export {required,word,atext,antext,text,integer,number,digit,file,email,phone,url,ip,array_length,and,or,equal,not_equal,regexp,callback}