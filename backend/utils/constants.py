class Role(object):
	INNOVATOR = "innovator"
	COMPANY = 'company'
	ADMIN = "admin"

	@staticmethod
	def values():
		return [Role.INNOVATOR, Role.COMPANY, Role.ADMIN]

class IdeaValidStatus(object):
	IS_VALID = 'isValid'
	IS_SPAM = 'isSpam'
	WARNING = 'warning'

	@staticmethod
	def values():
		return [IdeaValidStatus.IS_VALID, IdeaValidStatus.IS_SPAM, IdeaValidStatus.WARNING]
