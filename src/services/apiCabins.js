import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

/*----------------------------------------------------------------*/
//加载所有cabins
export async function getCabins() {
  //通过supabase的.from method来获取cabins这个table的数据，*代表选择全部row
  //这里返回的是上传后的row或者错误
  const { data, error } = await supabase.from("cabins").select("*");

  if (error)
    console.error("Fail to download data from supabase", error.message);

  return data;
}

/*----------------------------------------------------------------*/
//删除一个cabin，需要提供删除的cabin id
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}

/*----------------------------------------------------------------*/
//创建或编辑一个cabin
//这个地方需要注意一点：row中的数据都是文本，图片不属于文本所以不能直接上传到row中，只能上传到supabase的大文件库内，所以这里文本和image需要分开上传，因为上传图片的url是文本，上传之后又需要将大文件库中的文件的url提供给row中的image这一栏。
export async function createEditCabin(cabin) {
  console.log(cabin);
  //图片和row数据分离
  const { image, id, ...restData } = cabin;
  //看传进来的数据里有没有id，有的话就是编辑模式
  const isEditSession = Boolean(id);
  console.log(isEditSession ? "edit" : "create");
  //默认没有url，因为如果是创建模式，肯定没有url
  let hasImageUrl = false;
  //这步用来判断在编辑模式下，传到api这边的数据中的image是以前的url还是个新文件
  hasImageUrl = typeof image === "string";
  //给图片起名,要把/去掉，url中的/代表新建一个文件夹
  const imageName = `${Math.random()}-${image[0].name}`.replaceAll("/", "");
  //https://fkuukodiyrxtpftymbnu.supabase.co/storage/v1/object/public/cabin-images/cabin-004.jpg
  //观察上面的URL，前面一部分时supabaseURL，在supabase文件中有，后面一部分时文件名
  //如果传进来的数据的image有url，url不变。没有url，就证明传进来的是新文件，那么就给新文件一个新的url
  const imageUrl = hasImageUrl
    ? image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");
  //如果是编辑模式，就把以前表单里的数据和id和imageUrl都放进来打包好，然后上传
  if (isEditSession) {
    query = await query
      .update({ ...restData, id: id, image: imageUrl })
      .eq("id", id)
      .select()
      .single();
  }
  //如果是创建模式，就把以前表单里的数据和imageUrl都放进来打包好，然后上传
  if (!isEditSession) {
    query = await query
      .insert([{ ...restData, image: imageUrl }])
      .select()
      .single();
  }

  const { data, error } = query;

  if (error) {
    console.error(error);
    throw new Error(
      isEditSession ? "Cabin could not be edited" : "Cabin could not be created"
    );
  }

  // 这步是真正上传图片文件的步骤，如果传进来的没有url，那么就要上传文件
  if (!hasImageUrl) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      //这里要提供上传图片的名称和文件本身
      .upload(imageName, image[0]);

    if (storageError) {
      const { deleteError } = await supabase
        .from("cabins")
        .delete()
        .eq("id", data.id);
      console.error(storageError, deleteError);
      throw new Error("Find an error with uploading the image");
    }
  }

  return data;
}
