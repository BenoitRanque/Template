core_roles
	role_id
		uuid
			pk
	role_name
		text
	description
		text
	created_at
		timestamp
	updated_at
		timestamp
core_role_privileges
	role_id
		uuid
			pk
				fk
	privilege_id
		uuid
			pk
				fk
	created_at
		timestamp
	updated_at
		timestamp
core_privileges
	privilege_id
		uuid
			pk
	privilege_name
		text
	description
		text
	resource_id
		uuid
			fk
	action
		text
	possession
		text
	attributes
		text
	created_at
		timestamp
	updated_at
		timestamp
core_resources
	resource_id
		text
			pk
	description
		text
	module_id
		text
			fk
	created_at
		timestamp
	updated_at
		timestamp
core_modules
	module_id
		text
			pk
	description
		text
	created_at
		timestamp
	updated_at
		timestamp
core_role_extend
	extended_role_id
		uuid
			pk
				fk
	base_role_id
		uuid
			pk
				fk
	created_at
		timestamp
	updated_at
		timestamp
core_user_roles
	user_id
		uuid
			pk
				fk
	role_id
		uuid
			pk
				fk
	grantor_id
		uuid
			
				fk
	created_at
		timestamp
	updated_at
		timestamp
core_user_groups
	group_id
		uuid
			pk
				fk
	user_id
		uuid
			pk
				fk
core_users
	user_id
		uuid
			pk
	username
		text
	displayname
		text
	created_at
		timestamp
	updated_at
		timestamp
core_groups
	group_id
		uuid
			pk
	group_name
		text
	group_owner_id
		uuid
			
				fk
	description
		text
	created_at
		timestamp
	updated_at
		timestamp

core_user_password
	user_id
		uuid
			pk
				fk
	password
		text
	created_at
		timestamp
	updated_at
		timestamp

hr_employee
	employee_id
		uuid
			pk
	employee_external_id
		text
	created_at
		timestamp
	updated_at
		timestamp

hr_employee_identification_document
	identification_document_id
		uuid
			pk
	employee_id
		uuid
			
				fk
	identification_document_type
		text
	identification_document_number
		text
	identification_document_extension
		text
	created_at
		timestamp
	updated_at
		timestamp

hr_employee_information
	employee_id
		uuid
			pk
				fk
	first_name
		text
	middle_name
		text
	last_name_paternal
		text
	last_name_maternal
		text
	nationality
		text
	place_of_birth
		text
	date_of_birth
		text
	sex
		text
	marital status
		text
	created_at
		timestamp
	updated_at
		timestamp

hr_employee_contract
	contract_id
		uuid
			pk
	contract_external_id
		text
	employee_id
		uuid

				fk
	contract_sign
		timestamp
	contract_start
		timestamp
	contract_end
		timestamp
	position
		text
	contract_verbal
		boolean
	contract_type
		int
	position
		text
	contract_active
		boolean
	contract_cancel_date
		timestamp
	contract_cancel_motive
		int
	created_at
		timestamp
	updated_at
		timestamp

hr_employee_contact
	employee_id
		uuid
			pk
				fk
	mobile_1
		text
	mobile_2
		text
	phone_1
		text
	phone_2
		text
	email_1
		text
	email_2
		text
	created_at
		timestamp
	updated_at
		timestamp

hr_employee_emergency_contact
	contact_id
		uuid
			pk
	employee_id
		uuid

				fk
	name
		text
	relationship
		text
	mobile
		text
	phone
		text
	email
		text





hr_employee_

## identifcation
employee_id
internal_id
zktime_id

## identifcation_document
identification_document_type
identification_document_number
identification_document_extension

## names
last_name_paternal
last_name_maternal
first_name
middle_name

## personal info
nationality
place_of_birth
date_of_birth
sex
marital status

## contact
phone
mobile
email
address

## emergency contact
phone
mobile
email
address
relationship_with_employee

##