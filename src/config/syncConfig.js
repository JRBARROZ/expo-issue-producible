import { lightColors } from "../global/theme/colors";

const QueueExecutionPriorities = {
  delete: 3,
  edit: 2,
  post: 1,
};

const FlowPriorities = {
  visits: {
    name: "visits",
    id: 1,
    title: "Visitas",
    services: {
      create: "postAttendance",
      update: "",
      delete: "",
    },
    priority: 2,
  },
  family_record: {
    name: "family_record",
    id: 2,
    title: "Evoluções Familiares",
    services: {
      create: "postFamilyRecords",
      update: "",
      delete: "",
    },
    priority: 3,
  },
  patient_record: {
    name: "patient_record",
    id: 3,
    title: "Evoluções do Paciente",
    services: {
      create: "postFamilyRecords",
      update: "",
      delete: "",
    },
    priority: 3,
  },
  form_record: {
    name: "form_record",
    id: 4,
    title: "Formulários",
    services: {
      create: "postRecords",
      update: "patchRecords",
      delete: "",
    },
    priority: 3,
  },
  patient: {
    name: "patient",
    id: 5,
    title: "Pacientes",
    services: {
      create: "postPatient",
      update: "updatePatient",
      delete: "",
    },
    priority: 1,
  },
  family: {
    name: "family",
    id: 6,
    title: "Familias",
    services: {
      create: "postFamily",
      update: "",
      delete: "",
    },
    priority: 1,
  },
};

const OfflineStatusColor = {
  pending: lightColors.warning["500"],
  success: lightColors.success["400"],
  error: lightColors.error["400"],
};

const OfflineStatusDescriptions = {
  pending: "Aguardando Sincronização",
  success: "Sincronizado.",
  error: "Erro ao Sincronizar.",
};

export { QueueExecutionPriorities, FlowPriorities, OfflineStatusColor, OfflineStatusDescriptions };
