/// <reference types="@types/bcrypt" />

import { createPool, RowDataPacket } from 'mysql2/promise';
import { hash, compare } from 'bcrypt';

interface User extends RowDataPacket {
  id: number;
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<LoginBody>(event);
    const { email, password } = body;

    // Validation basique
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        message: 'Email et mot de passe requis',
      });
    }

    // Création de la connexion MySQL
    const pool = createPool({
      host: 'localhost',
      port: 8889,
      user: 'root',
      password: 'Beulah68',
      database: 'test',
    });

    // Recherche de l'utilisateur avec le bon typage
    const [rows] = await pool.execute<User[]>('SELECT * FROM users WHERE email = ?', [email]);

    const user = rows[0];

    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Identifiants incorrects',
      });
    }

    // Vérification du mot de passe
    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        message: 'Identifiants incorrects',
      });
    }

    // Retourner la réponse de succès
    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  } catch (error) {
    console.error('Erreur de connexion:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erreur interne du serveur',
    });
  }
});