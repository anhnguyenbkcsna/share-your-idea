class Role(object):
	INNOVATOR = "innovator"
	COMPANY = "company"

	@staticmethod
	def values():
		return [Role.INNOVATOR, Role.COMPANY]
