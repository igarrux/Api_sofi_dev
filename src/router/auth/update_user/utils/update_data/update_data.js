export const updateData = (oldData, newData) => {
	Object.entries(newData).forEach(([key, value]) => {
        if(value)        oldData[key] = value
    })
}
