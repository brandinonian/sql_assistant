'use client'

export function extract_create_table_query(data) {
  try {
    const start = data.split('CREATE TABLE');
    const end = start[1].split(';');
    const query = 'CREATE TABLE ' + end[0] + ';';
    return query;
  }
  catch (error) {
    return null;
  }
}

export function extract_insert_query(data) {
  try {
    const start = data.split('INSERT');
    const end = start[1].split(';');
    const query = 'INSERT ' + end[0] + ';';
    return query;
  }
  catch (error) {
    return null;
  }
}