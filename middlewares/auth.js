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
	const _userPreferences = await prisma.userPreferences.findFirst({
		where: {
			user_id: session.user.id,
		},
		include: {
			role: {
				include: {
					tables: true,
				},
			},
			branches: true,
		},
	})

	
	
	return {
		props: { userPreferences: JSON.parse(JSON.stringify(_userPreferences)), sessionUser: session.user },
	}
	
		
}