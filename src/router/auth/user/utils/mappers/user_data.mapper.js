export const userDataMapper = (userDBData) => ({
	id: userDBData._id,
	email: userDBData.email,
	name: userDBData.name,
	user_name: userDBData.user_name
})
