import bcrypt from 'bcryptjs';

export function saltAndHashPassword(password: any) {
	const saltRounds = 10;
	const salt = bcrypt.genSaltSync(saltRounds);
	const hash = bcrypt.hashSync(password, salt);

	return hash;
}

export function checkEmail(email: string) {
	const firstSplit = email.split('@');
	if (firstSplit.length > 1) {
		const dotSplit = firstSplit[1].split('.');
		if (dotSplit.length > 1) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}
