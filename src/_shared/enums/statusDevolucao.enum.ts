export enum StatusDevolucao {
  AGUARDANDO_LIBERACAO = 'AGUARDANDO_LIBERACAO', // Demanda criada, mas ainda não disponível para o armazém
  AGUARDANDO_CONFERENCIA = 'AGUARDANDO_CONFERENCIA', // Liberado para o armazém, aguardando um conferente iniciar
  EM_CONFERENCIA = 'EM_CONFERENCIA', // Conferência em andamento
  CONFERENCIA_FINALIZADA = 'CONFERENCIA_FINALIZADA', // Conferência terminada, aguardando finalização do processo
  FINALIZADO = 'FINALIZADO', // Processo concluído
  CANCELADO = 'CANCELADO', // Processo cancelado
}
