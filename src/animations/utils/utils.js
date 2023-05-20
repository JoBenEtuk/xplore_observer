export function getRandom(list) {
	return list[Math.floor(Math.random() * list.length)]
}

export function randomNoRepeats(array) {
	var copy = array.slice(0)
	return function () {
		if (copy.length < 1) {
			copy = array.slice(0)
		}
		var index = Math.floor(Math.random() * copy.length)
		var item = copy[index]
		copy.splice(index, 1)
		return item
	}
}
