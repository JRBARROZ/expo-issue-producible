import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  PrimaryColumn,
  ManyToOne,
} from "typeorm";
@Entity("category")
export class Category {
  @PrimaryColumn("uuid")
  id!: string;

  @Column("text")
  name!: string;
}

@Entity("post")
export class Post {
  @PrimaryColumn("uuid")
  id!: string;

  @Column("text")
  title!: string;

  @Column("text")
  text!: string;

  @Column("uuid", {
    nullable: true,
  })
  category_id!: number;

  @ManyToOne(() => Category, {})
  @JoinTable({
    joinColumn: "category_id",
  })
  categories!: Category[];
}
