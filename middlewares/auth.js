import jwt from 'jsonwebtoken';
import { getSession } from 'next-auth/react'
import { PrismaClient } from '@prisma/client'


export function validateToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return reject(err);
      }

      return resolve(decoded);
    });
  });
}

export async function validateUserSession(context) {
  const prisma = new PrismaClient()
	const session = await getSession(context)

	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		}
	}

	const _preferences = await prisma.user.findUnique({
		where: {
			email: session.user.email,
		},
		include: {
			preference: true
		}
	})

	const _rol = await prisma.role.findUnique({
		where: {
			id: _preferences.preference.role_id,
		},
		include: {
			tables:true
		}
	})
	const _userPreferences = { ..._preferences, ..._rol }
	console.log(_userPreferences)
	prisma.$disconnect()
	
	return {
		props: { userPreferences: JSON.parse(JSON.stringify(_userPreferences)), sessionUser: session.user },
	}
	
		
}