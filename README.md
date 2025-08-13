# DjValidatorVue -	Form model based validation for Vue3

Version 1.0.0

THE SIMPLEST VUE VALIDATION LIBRARY!

DjValidatorVue is the most simple, flexible and quick to use library for vue validation, it does not depend on any UI.
Available in English, Russian and Spanish.

## Features

- Model based validator
- Simple and quick validation rules
- Minimum code
- Integration with any type of vue project
- Optional custom component for messages
- You can create your own validators
- Without dependency
- UI independent

[SHOW DEMO HERE!!!](https://esneyderg357.github.io/DjValidatorVue-docs)

## Install

    npm install djvalidatorvue --save

## Import

    import {validate} from 'djvalidatorvue'

## Using

	//object to validate (simple object or reactive)
	let mi_obj=reactive({
		email:"",
		username: "",
		password: "",
		obs:""
	})

	//declare object with validation instructions
	const validations={
		email:{rule:'email,50'}, 
		obs:{req:true,rule:'text,5,150'},
		username:{req:true,rule:'word,4,20'},
		password:{req:true,rule:'word,6,20',msg:'invalid password'},
	}

	//declare object to contain errors
	let errors=reactive({})

	//To validate, use the validate method
	function save(){
		let resp=validate(mi_obj,validations,errors)
		alert(resp)//true or false
	}

	//errors contains invalid feedback, to show:
	<input type="text" v-model="mi_obj.email">
	<span class="error" v-if="errors.email">{{errors.email}}</span>

	//You can also use the built-in component (import {DjError} from 'djvalidatorvue')
	<input type="text" v-model="mi_obj.email">
	<DjError :error="errors.email"/>

	
[SHOW THE FULL DOCUMENTATION](https://esneyderg357.github.io/DjValidatorVue-docs)

### Other uses:

You can validate just one field with validate_field, and it can be run attached to events like @blur.

	//Validate only a field
	import {validate_field} from 'djvalidatorvue'

	function validate_email(){
		let resp=validate_field('email',mi_obj,validations,errors)
		//actions
	}

	<input type="text" v-model="mi_obj.email" @blur="validate_email">
	<DjError :error="errors.email"/>
			

You can also validate individual variables with validate_var.
	
	import {validate_var} from 'djvalidatorvue'
	let error=ref(null)
	funciton check(texto){
		validate_var(texto,{req:true,rule:'text,5,150'},error)
	}

### Clear errors:

To clear errors and stop displaying them you can use clean_errors.

	import {clean_errors} from 'djvalidatorvue'

	let errors=reactive({})

	function open_form(){
		clean_errors(errors)
	}

	
Or empty the errors object manually

### Change validation message:

Add 'msg' in the validations object.
	
	const validations={
		username:{req:true,rule:'word,4,20'},
		password:{req:true,rule:'word,6,20',msg:'invalid password'},
	}

### Error component style:
	
There are 2 css variables to change the style of the error message:

	--dj-validator-error-color
	--dj-validator-text-size

### Add own validations:
	
With regular expressions:
	
	const validations={
		mi_field:{req:true,rule:'regexp,^[aeiou]+$,i'},
	}

With own functions:
	
	const validations={
		mi_field:{req:true,rule:'call',func:isUpperCase},
	}

	function isUpperCase(value,params){
		return value==value.toUpperCase()
	}

Adding a new rule:

	import {add_validator} from 'djvalidatorvue'

	add_validator('upper',isUpperCase,'text is not uppercase')

	function isUpperCase(value,params){
		return value==value.toUpperCase()
	}

	const validations={
		mi_field:{req:true,rule:'upper'},
	}

## Documentation:

[SHOW THE FULL DOCUMENTATION](https://esneyderg357.github.io/DjValidatorVue-docs)

## Author

DjValidatorVue was written by David Esneyder Jerez Garnica.

[Linkedin](https://www.linkedin.com/in/david-esneyder-jerez-garnica-84309b239/)

[esneyderg357@gmail.com](mailto:esneyderg357@gmail.com)

## License

Copyright (c) 2025 David Esneyder Jerez Garnica.
Released under the GPL v3 license.
