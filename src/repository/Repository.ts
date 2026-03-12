export interface Repository<CreateDTO, ResponseDTO> {
    create(createDTO: CreateDTO): Promise<ResponseDTO>
    findById(id: string): Promise<ResponseDTO>
    delete(id: string): Promise<void>
}