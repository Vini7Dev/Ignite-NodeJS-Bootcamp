interface ICreateRentalDTO {
    id?: string;
    end_date?: Date;
    total?: number;
    car_id: string;
    user_id: string;
    expected_return_date: Date;
}

export default ICreateRentalDTO;
