import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import RegisterForm from '../../../components/RegisterForm';
import { getSingleUser } from '../../../utils/data/userData';

export default function EditUser() {
  const [editUser, setEditUser] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleUser(id).then(setEditUser);
  }, [id]);

  return (
    <div>
      <h1>Edit Profile</h1>
      <RegisterForm user={editUser} />
    </div>
  );
}
