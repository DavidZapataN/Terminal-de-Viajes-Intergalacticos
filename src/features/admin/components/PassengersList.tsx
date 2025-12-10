import { getAllUsers, deleteUser, type User } from '@/app/services/user.service'
import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/Table'
import { Loader2, Trash2, User as UserIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { showSuccess, showError } from '@/lib/toast.config'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

export const PassengersList = () => {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDelete = async (userId: number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este usuario?')) return

    setDeletingId(userId)
    try {
      await deleteUser(userId)
      showSuccess('Usuario eliminado exitosamente')
      fetchUsers()
    } catch (error) {
      showError('Error al eliminar el usuario')
    } finally {
      setDeletingId(null)
    }
  }

  if (isLoading) {
    return (
      <Card>
        <div className="flex items-center justify-center gap-2 py-12">
          <Loader2 className="h-6 w-6 animate-spin text-cyan-400" />
          <span className="text-gray-400">Cargando usuarios...</span>
        </div>
      </Card>
    )
  }

  if (users.length === 0) {
    return (
      <Card>
        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <UserIcon className="h-12 w-12 text-gray-600" />
          <p className="text-gray-400">No hay usuarios registrados</p>
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Fecha de Registro</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell className="font-mono text-cyan-400">
                  #{user.id}
                </TableCell>
                <TableCell>
                  {user.name} {user.lastName}
                </TableCell>
                <TableCell className="text-gray-400">{user.email}</TableCell>
                <TableCell className="text-gray-400">
                  {format(parseISO(user.createdAt), "d 'de' MMM, yyyy", {
                    locale: es,
                  })}
                </TableCell>
                <TableCell>
                  <Button
                    className="holo-border text-red-400! hover:text-white!"
                    variant="secondary"
                    onClick={() => handleDelete(user.id)}
                    disabled={deletingId === user.id}
                  >
                    {deletingId === user.id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
