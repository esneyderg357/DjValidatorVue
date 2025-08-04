import {word,atext,antext,text,integer,number,digit,file,email,phone,url,ip,array_length,and,or,equal,not_equal,regexp,callback} from './functions'

export default [
    {'key':'word','func':word},
    {'key':'atext','func':atext},
    {'key':'antext','func':antext},
    {'key':'text','func':text},
    {'key':'int','func':integer},
    {'key':'num','func':number},
    {'key':'dig','func':digit},
    {'key':'file','func':file},
    {'key':'email','func':email},
    {'key':'phone','func':phone},
    {'key':'url','func':url},
    {'key':'ip','func':ip},
    {'key':'array','func':array_length},
    {'key':'and','func':and,'ref':true},
    {'key':'or','func':or,'ref':true},
    {'key':'equal','func':equal},
    {'key':'nequal','func':not_equal},
    {'key':'regexp','func':regexp},
    {'key':'call','func':callback},
]