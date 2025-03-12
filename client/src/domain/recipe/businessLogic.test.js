import { createRecipeItem, deleteRecipeItem, calculateIngestingInstructions } from './businessLogic';

describe('createRecipeItem', () => {
  test('should create a recipe item with required fields', () => {
    // Arrange
    const data = { name: 'Aspirin' };
    const options = { idProvider: { getId: () => '123' } };

    // Act
    const result = createRecipeItem(data, options);

    // Assert
    expect(result).toEqual({
      id: '123',
      name: 'Aspirin',
      timesPerDay: 1,
      duration: 1,
    });
  });

  test('should create a recipe item with all fields', () => {
    // Arrange
    const data = {
      name: 'Paracetamol',
      timesPerDay: 2,
      duration: 3,
    };
    const options = { idProvider: { getId: () => '456' } };

    // Act
    const result = createRecipeItem(data, options);

    // Assert
    expect(result).toEqual({
      id: '456',
      name: 'Paracetamol',
      timesPerDay: 2,
      duration: 3,
    });
  });

  test('should throw an error if idProvider is not provided', () => {
    // Arrange
    const data = { name: 'Aspirin' };
    const options = {};

    // Act & Assert
    expect(() => createRecipeItem(data, options)).toThrow('idProvider is required');
  });
});

describe('deleteRecipeItem', () => {
  test('should remove the drug with the specified id', () => {
    // Arrange
    const drugs = [
      { id: '1', name: 'Drug A' },
      { id: '2', name: 'Drug B' },
      { id: '3', name: 'Drug C' },
    ];

    // Act
    const result = deleteRecipeItem(drugs, '2');

    // Assert
    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { id: '1', name: 'Drug A' },
      { id: '3', name: 'Drug C' },
    ]);
  });

  test('should return the same array if drug with id not found', () => {
    // Arrange
    const drugs = [
      { id: '1', name: 'Drug A' },
      { id: '2', name: 'Drug B' },
    ];

    // Act
    const result = deleteRecipeItem(drugs, '3');

    // Assert
    expect(result).toHaveLength(2);
    expect(result).toEqual(drugs);
  });

  test('should handle empty array', () => {
    // Arrange
    const drugs = [];

    // Act
    const result = deleteRecipeItem(drugs, '1');

    // Assert
    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });
});

describe('calculateIngestingInstructions', () => {
  test('should correctly distribute drugs based on timesPerDay and duration', () => {
    // Arrange
    const drugs = [
      { id: '1', name: 'Drug A', timesPerDay: 1, duration: 2 },
      { id: '2', name: 'Drug B', timesPerDay: 2, duration: 1 },
    ];

    // Act
    const result = calculateIngestingInstructions(drugs);

    // Assert
    expect(result).toHaveLength(2);
    
    // Day 0
    expect(result[0].morning).toContainEqual(expect.objectContaining({ id: '1', name: 'Drug A' }));
    expect(result[0].morning).toContainEqual(expect.objectContaining({ id: '2', name: 'Drug B' }));
    expect(result[0].afternoon).toHaveLength(0);
    expect(result[0].evening).toContainEqual(expect.objectContaining({ id: '2', name: 'Drug B' }));
    expect(result[0].night).toHaveLength(0);
    
    // Day 1
    expect(result[1].morning).toContainEqual(expect.objectContaining({ id: '1', name: 'Drug A' }));
    expect(result[1].afternoon).toHaveLength(0);
    expect(result[1].evening).toHaveLength(0);
    expect(result[1].night).toHaveLength(0);
  });

  test('should handle drugs with different timesPerDay values', () => {
    // Arrange
    const drugs = [
      { id: '1', name: 'Drug A', timesPerDay: 1, duration: 1 },
      { id: '2', name: 'Drug B', timesPerDay: 2, duration: 1 },
      { id: '3', name: 'Drug C', timesPerDay: 3, duration: 1 },
      { id: '4', name: 'Drug D', timesPerDay: 4, duration: 1 },
    ];

    // Act
    const result = calculateIngestingInstructions(drugs);

    // Assert
    expect(result).toHaveLength(1);
    
    // Day 0
    expect(result[0].morning).toHaveLength(4);
    expect(result[0].afternoon).toHaveLength(2);
    expect(result[0].evening).toHaveLength(3);
    expect(result[0].night).toHaveLength(1);
  });

  test('should handle empty drugs array', () => {
    // Arrange
    const drugs = [];

    // Act
    const result = calculateIngestingInstructions(drugs);

    // Assert
    expect(result).toHaveLength(0);
  });
});
