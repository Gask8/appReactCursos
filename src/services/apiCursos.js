import supabase from "./supabase";

export async function getCursos(query) {
  console.log(query, `%${query}%`);

  const { data, error } = await supabase
    .from("cursos")
    .select("*")
    .ilike("nombre", `%${query}%`);

  if (error) {
    console.error(error);
    throw new Error("No se pudo cargar la informacion");
  }

  return data;
}

export async function createManyCursos(newCursos) {
  const { data, error } = await supabase.from("cursos").insert(newCursos);

  if (error) {
    console.error(error);
    throw new Error("Error al subir la informacion");
  }

  return data;
}

export async function deleteManyCursos(id) {
  const { data, error } = await supabase
    .from("cursos")
    .delete()
    .eq("id_batch", id);

  if (error) {
    console.error(error);
    throw new Error("Error al subir la informacion");
  }

  return data;
}
