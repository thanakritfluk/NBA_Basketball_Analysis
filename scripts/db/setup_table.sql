

CREATE TABLE IF NOT EXISTS standing (
	id SERIAL PRIMARY KEY,
  rank INT,
	team_name VARCHAR(255),		
	conference VARCHAR(255),
	year VARCHAR(255),   
  w_score	INT,
  l_score INT,
  pct_score FLOAT,
  cgb_score FLOAT,
  home_score VARCHAR(255),	
  div_score VARCHAR(255),		
  conf_score VARCHAR(255),	
  l10_score VARCHAR(255),		
  pf_score FLOAT,
  pa_score FLOAT,  
  diff_score FLOAT,
	strk_score VARCHAR(255)
);
