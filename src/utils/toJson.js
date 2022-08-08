export function toJson(string) {
	try {
		return JSON.parse(string)
	} catch (error) {
		return {}
	}
}
