import { conn } from "./db";
import { Category, Post } from "./entitites";

const PostRepo = conn.getRepository(Post);
const queryRunner = conn.createQueryRunner();
const useRepository = () => {
  const postTest = async () => {
    // const connection = await queryRunner.connect();

    try {
      // await new Promise((ok, fail) => {
      //   connection.exec([{ sql: "PRAGMA foreign_keys = ON;", args: [] }], false, (err: Error) =>
      //     err ? fail(err) : ok(true),
      //   );
      // });

      console.log(await conn.query("PRAGMA foreign_keys"));

      await queryRunner.manager.save(Post, {
        data: {
          id: null,
          category_id: null,
          title: null,
          text: null,
        },
      });

      console.log("PASSED_FROM_SAVE_0");
      // var post = await PostRepo.find();
      // console.log(post, "PASSED_FROM_FIND_1");
    } catch (err) {
      console.log(err);
    }
    queryRunner.release();
  };

  return {
    postTest,
  };
};

export { useRepository };
