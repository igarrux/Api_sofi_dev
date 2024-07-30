export const userDataMapper = (userDBData) => ({
	id: userDBData._id,
	email: userDBData.email,
	name: userDBData.name,
	user_name: userDBData.user_name,
	profile_img: `/profiles/${userDBData.user_name}.${userDBData.img_ext}?time=${userDBData.updatedAt}`,
	updatedAt: userDBData.updatedAt,
})
