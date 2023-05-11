import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');

  const handleAdicionarTarefa = () => {
    if (novaTarefa !== '') {
      setTarefas([...tarefas, { nome: novaTarefa, concluida: false }]);
      setNovaTarefa('');
    }
  };

  const handleConcluirTarefa = (index) => {
    const novasTarefas = [...tarefas];
    novasTarefas[index].concluida = !novasTarefas[index].concluida;
    setTarefas(novasTarefas);
  };

  const handleRemoverTarefa = (index) => {
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1);
    setTarefas(novasTarefas);
  };

  const calcularProgresso = () => {
    const tarefasConcluidas = tarefas.filter((tarefa) => tarefa.concluida).length;
    const totalTarefas = tarefas.length;
    if (totalTarefas > 0) {
      return `${((tarefasConcluidas / totalTarefas) * 100).toFixed(2)}%`;
    } else {
      return '0%';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Tarefas</Text>
      <View style={styles.adicionarContainer}>
        <TextInput
          style={styles.input}
          value={novaTarefa}
          onChangeText={(texto) => setNovaTarefa(texto)}
          placeholder="Adicionar tarefa"
        />
        <Button title="Adicionar" onPress={handleAdicionarTarefa} />
      </View>
      <View style={styles.listaContainer}>
        {tarefas.map((tarefa, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={tarefa.concluida ? styles.itemConcluido : styles.item}>{tarefa.nome}</Text>
            <Button
              title={tarefa.concluida ? 'Desmarcar' : 'Concluir'}
              onPress={() => handleConcluirTarefa(index)}
            />
            <Button title="Remover" onPress={() => handleRemoverTarefa(index)} />
          </View>
        ))}
      </View>
      <Text style={styles.progresso}>Progresso: {calcularProgresso()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  adicionarContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  listaContainer: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  item: {
    flex:1,
  },
    itemConcluido: {
    flex: 1,
    textDecorationLine: 'line-through',
  },
    progresso: {
    marginTop: 20,
  },
  });