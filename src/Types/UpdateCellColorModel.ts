export interface UpdateCellColorModel {
//     public Guid CellId { get; set; }
// public Guid WorldId { get; set; }
// public Guid ChunkId { get; set; }
// public string Color { get; set; }
    CellId: string,
    WorldId: string,
    ChunkId: string,
    Color: string
}