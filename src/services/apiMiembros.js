import supabase from "./supabase";

export async function getMiembro(id) {
  const { data, error } = await supabase
    .from("miembros")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("No se pudo cargar la informacion");
  }

  return data;
}

export async function getMiembros(query) {
  // const { id, seccion, localidad } = options;

  const { data, error } = await supabase
    .from("miembros")
    .select("*")
    .ilike("nombre", `%${query}%`)
    .order("creado_en", { ascending: true });

  // .from("Individual_Inform")
  // .select("*")
  // .eq("seccion", seccion)
  // .eq("id_batch", id)
  // .eq("localidad", localidad)
  // .limit(1)
  // .single();

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
