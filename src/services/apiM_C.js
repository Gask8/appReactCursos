import supabase from "./supabase";

export async function getCursosForMiembro(id) {
  if (!id) {
    return [];
  }

  const { data, error } = await supabase
    .from("miembros_cursos")
    .select("id, creado_en, cursos(*)")
    .eq("id_miembro", id);

  if (error) {
    console.error(error);
    throw new Error("No se pudo cargar la informacion");
  }

  return data;
}

export async function getMiembrosForCurso(id) {
  if (!id) {
    return [];
  }

  const { data, error } = await supabase
    .from("miembros_cursos")
    .select("id, creado_en, miembros(*)")
    .eq("id_curso", id);

  if (error) {
    console.error(error);
    throw new Error("No se pudo cargar la informacion");
  }

  return data;
}

export async function createManyMiembros(newMiembros) {
  const { data, error } = await supabase.from("miembros").insert(newMiembros);

  if (error) {
    console.error(error);
    throw new Error("Error al subir la informacion");
  }

  return data;
}

export async function deleteManyMiembros(id) {
  const { data, error } = await supabase
    .from("miembros")
    .delete()
    .eq("id_batch", id);

  if (error) {
    console.error(error);
    throw new Error("Error al subir la informacion");
  }

  return data;
}
