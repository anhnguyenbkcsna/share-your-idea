class Role(object):
	INNOVATOR = "innovator"
	COMPANY = "company"
	ADMIN = "admin"

	@staticmethod
	def values():
		return [Role.INNOVATOR, Role.COMPANY, Role.ADMIN]
