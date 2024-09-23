import { FC } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import DeleteIcon from '@mui/icons-material/Delete';

interface RemoveBtnProps {
    id: string;
    setIsChanged  : React.Dispatch<React.SetStateAction<boolean>>

}

const RemoveButton: FC<RemoveBtnProps> = ({ id , setIsChanged}) => {
    const router = useRouter();
    const pathname = usePathname()

    const removeUser = async (): Promise<void> => {
        const confirmed: boolean = confirm("Are you sure?");
        const endpoint = pathname.startsWith('/users') ? 'user' : 'customer';

        if (confirmed) {
            const res: Response = await fetch(`http://localhost:3000/api/${endpoint}?id=${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setIsChanged(bool => !bool)
                alert("Data Deleted")
                
            }
        }
    };

    return (
        <button onClick={removeUser}>
            <DeleteIcon />
        </button>
    );
}

export default RemoveButton;