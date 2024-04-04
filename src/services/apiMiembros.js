import supabase from "./supabase";

export async function getMiembros(query) {
  // const { id, seccion, localidad } = options;

  console.log(query, `%${query}%`);

  const { data, error } = await supabase
    .from("miembros")
    .select("*")
    .ilike("nombre", `%${query}%`);

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
