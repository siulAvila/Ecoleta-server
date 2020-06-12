import Knex from 'knex';

export async function seed(knex: Knex) {
  return await knex('items').insert([
    { title: 'Lâmpadas', image_url: 'lampadas.svg' },
    { title: 'Pilas e Baterias', image_url: 'baterias.svg' },
    { title: 'Papéis e Papelão', image_url: 'papeis-papelao.svg' },
    { title: 'Resíduos Eletrônicos', image_url: 'eletronicos.svg' },
    { title: 'Resíduos Orgânicos', image_url: 'organicos.svg' },
    { title: 'Oléo de Cozinha', image_url: 'oleo.svg' },
  ]);
}
