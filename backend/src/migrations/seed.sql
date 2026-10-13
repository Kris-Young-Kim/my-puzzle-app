INSERT INTO painters (id, name, birth_year, death_year, bio_short) VALUES
  ('vangogh', 'Vincent van Gogh', 1853, 1890, '네덜란드 후기 인상주의 화가'),
  ('monet', 'Claude Monet', 1840, 1926, '프랑스 인상주의의 창시자'),
  ('vermeer', 'Johannes Vermeer', 1632, 1675, '네덜란드 황금기의 화가'),
  ('klimt', 'Gustav Klimt', 1862, 1918, '오스트리아 상징주의 화가'),
  ('seurat', 'Georges Seurat', 1859, 1891, '점묘법을 창시한 신인상주의 화가')
ON CONFLICT (id) DO NOTHING;

INSERT INTO paintings (id, painter_id, title, image_url, thumbnail_url, style_tag, docent_story, is_featured) VALUES
  ('starry-night', 'vangogh', '별이 빛나는 밤', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg', 'post-impressionism', '생레미 요양원에서 그린 밤하늘.', TRUE),
  ('water-lilies', 'monet', '수련', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg/960px-Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg/960px-Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg', 'impressionism', '지베르니 정원 연못 연작.', TRUE),
  ('girl-pearl-earring', 'vermeer', '진주 귀걸이를 한 소녀', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/960px-1665_Girl_with_a_Pearl_Earring.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/960px-1665_Girl_with_a_Pearl_Earring.jpg', 'baroque', '북구의 모나리자로 불린다.', TRUE),
  ('the-kiss', 'klimt', '키스', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg/960px-The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg/960px-The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg', 'symbolism', '황금빛 시대의 대표작.', FALSE),
  ('la-grande-jatte', 'seurat', '그랑드 자트 섬의 일요일 오후', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/A_Sunday_on_La_Grande_Jatte_--_Georges_Seurat.jpg/1280px-A_Sunday_on_La_Grande_Jatte_--_Georges_Seurat.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/A_Sunday_on_La_Grande_Jatte_--_Georges_Seurat.jpg/1280px-A_Sunday_on_La_Grande_Jatte_--_Georges_Seurat.jpg', 'neo-impressionism', '수천 개의 점으로 완성한 그림.', FALSE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO painting_difficulties (painting_id, level, grid_cols, grid_rows) VALUES
  ('starry-night', '25', 5, 5), ('starry-night', '100', 10, 10), ('starry-night', '400', 20, 20),
  ('water-lilies', '25', 5, 5), ('water-lilies', '100', 10, 10), ('water-lilies', '400', 20, 20),
  ('girl-pearl-earring', '25', 5, 5), ('girl-pearl-earring', '100', 10, 10), ('girl-pearl-earring', '400', 20, 20),
  ('the-kiss', '25', 5, 5), ('the-kiss', '100', 10, 10), ('the-kiss', '400', 20, 20),
  ('la-grande-jatte', '25', 5, 5), ('la-grande-jatte', '100', 10, 10), ('la-grande-jatte', '400', 20, 20)
ON CONFLICT (painting_id, level) DO NOTHING;

INSERT INTO packs (id, name, description, price_display, revenuecat_product_id, painting_ids) VALUES
  ('impressionism-masters', '인상주의 거장팩', '모네와 인상주의 거장들의 추가 명화', '$3.99', 'rc_impressionism_masters', ARRAY['water-lilies'])
ON CONFLICT (id) DO NOTHING;
