import supabase from "./supabase";

export async function getCurso(id) {
  const { data, error } = await supabase
    .from("cursos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("No se pudo cargar la informacion");
  }

  return data;
}

export async function getCursos(query) {
  const { data, error } = await supabase
    .from("cursos")
    .select("*")
    .ilike("nombre", `%${query}%`)
    .order("creado_en", { ascending: true });

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
