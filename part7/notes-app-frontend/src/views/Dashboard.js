import React from 'react'
import NoteList from '../components/Note/NoteList'
import NoteCreateModal from '../components/Note/NoteCreateModal'
import Wrapper from '../components/Wrapper'

const Dashboard = () => (
  <Wrapper>
    <NoteCreateModal />
    <NoteList />
  </Wrapper>
)

export default Dashboard
