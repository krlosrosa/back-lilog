export enum StatusPaleteNest {
  NAO_INICIADO = 'NAO_INICIADO', // Demanda criada, mas ainda não disponível para o armazém
  EM_PROGRESSO = 'EM_PROGRESSO', // Liberado para o armazém, aguardando um conferente iniciar
  CONCLUIDO = 'CONCLUIDO', // Conferência em andamento
  EM_PAUSA = 'EM_PAUSA', // Conferência terminada, aguardando finalização do processo
}
