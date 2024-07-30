export const userDataMapper = (userDBData) => ({
	id: userDBData._id,
	email: userDBData.email,
	name: userDBData.name,
	user_name: userDBData.user_name,
	profile_img: `/profiles/${userDBData.user_name}.${
		userDBData.img_ext
	}?time=${new Date(userDBData.updatedAt).getTime()}`,
	updatedAt: userDBData.updatedAt,
})
