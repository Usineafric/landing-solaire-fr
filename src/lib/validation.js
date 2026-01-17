import { z } from "zod";

// Regex pour téléphone français
const phoneRegex = /^(?:(?:\+|00)33|0)[1-9](?:[0-9]{2}){4}$/;

// Codes postaux invalides (DOM-TOM, Corse, invalides)
const invalidPostalCodes = ["97", "98", "00", "20"];

// Schéma de validation pour l'étape 1
export const step1Schema = z.object({
  isOwner: z.enum(["yes", "no"], {
    required_error: "Veuillez indiquer si vous êtes propriétaire",
  }),
  housingType: z.enum(["house", "apartment"], {
    required_error: "Veuillez sélectionner le type de bien",
  }),
  postalCode: z
    .string()
    .min(5, "Le code postal doit contenir 5 chiffres")
    .max(5, "Le code postal doit contenir 5 chiffres")
    .regex(/^\d{5}$/, "Code postal invalide")
    .refine(
      (val) => !invalidPostalCodes.includes(val.substring(0, 2)),
      "Service disponible en France métropolitaine uniquement"
    ),
});

// Schéma de validation pour l'étape 2
export const step2Schema = z.object({
  requestType: z.string().min(1, "Veuillez sélectionner un type de demande"),
  projectDeadline: z.string().min(1, "Veuillez indiquer votre délai"),
  description: z.string().optional(),
});

// Schéma de validation pour l'étape 3
export const step3Schema = z.object({
  firstName: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom est trop long"),
  lastName: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom est trop long"),
  phone: z
    .string()
    .transform((val) => val.replace(/\s/g, ""))
    .refine((val) => phoneRegex.test(val), "Numéro de téléphone français invalide"),
  email: z.string().email("Adresse email invalide"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter les conditions" }),
  }),
});

// Schéma complet du formulaire
export const leadFormSchema = step1Schema.merge(step2Schema).merge(step3Schema);

// Fonction utilitaire pour valider et retourner les erreurs formatées
export function validateStep(schema, data) {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data, errors: null };
  }

  const errors = {};
  // Zod v4 utilise result.error.issues au lieu de result.error.errors
  const issues = result.error.issues || result.error.errors || [];
  issues.forEach((err) => {
    const field = err.path[0];
    if (!errors[field]) {
      errors[field] = err.message;
    }
  });

  return { success: false, data: null, errors };
}

// Vérification d'éligibilité
export function checkEligibility(data) {
  return data.isOwner === "yes" && data.housingType === "house";
}
