import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'TB_COM_CODE' })
export class ComCode {

    @PrimaryColumn('varchar', { length: 6, nullable: false })
    ctgrCd: string;

    @PrimaryColumn('varchar', { length: 6, nullable: false})
    dtlCd: string;

    @Column('varchar', { length: 40})
    cdNm: string;

    @Column('datetime')
    expDt: string;
}