import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'TB_COM_CODE' })
export class ComCode {

    @PrimaryColumn('varchar', { name: 'CTGR_CD', length: 6, nullable: false })
    ctgrCd: string;

    @PrimaryColumn('varchar', { name: 'DTL_CD', length: 6, nullable: false})
    dtlCd: string;

    @Column('varchar', { name: 'CD_NM', length: 40})
    cdNm: string;

    @Column('datetime', { name: 'EXP_DT' })
    expDt: string;
}