import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity({ name: 'commits_metrics_query'})
export default class CommitsMetricsQuery {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  owner: string;

  @Column()
  repository: string;

  @CreateDateColumn()
  creationDate: Date;

}
